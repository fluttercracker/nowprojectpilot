import { Project } from './project';

const isDev = import.meta.env.DEV;
const apiBaseUrl = isDev ? 'http://localhost:4000' : `${import.meta.env.BASE_URL}api`;
const assetBaseUrl = import.meta.env.BASE_URL || '/';

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the project(s).';
    default:
      return 'There was an error retrieving the project(s). Please try again.';
  }
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    const errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response) {
  return response.json();
}

function delay(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function resolveAssetUrl(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith(import.meta.env.BASE_URL)) return path;
  const normalized = path.replace(/^\/+/, '');
  return `${assetBaseUrl}${normalized}`;
}

function mapProject(project) {
  return new Project({
    ...project,
    imageUrl: resolveAssetUrl(project.imageUrl),
  });
}

function fetchStaticProjects() {
  return fetch(`${apiBaseUrl}/db.json`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => data?.projects ?? []);
}

const projectAPI = {
  find(id) {
    if (isDev) {
      return fetch(`${apiBaseUrl}/projects/${id}`)
        .then(checkStatus)
        .then(parseJSON)
        .then(mapProject);
    }

    return fetchStaticProjects()
      .then((projects) => {
        const project = projects.find((p) => p.id === Number(id));
        if (!project) throw new Error('Project not found');
        return mapProject(project);
      })
      .catch((error) => {
        console.log('log client error ' + error);
        throw new Error('There was an error retrieving the project. Please try again.');
      });
  },

  get(page = 1, limit = 10) {
    if (isDev) {
      return fetch(`${apiBaseUrl}/projects?_page=${page}&_limit=${limit}&_sort=name`)
        .then(delay(2000))
        .then(checkStatus)
        .then(parseJSON)
        .then((projects) => projects.map(mapProject))
        .catch((error) => {
          console.log('log client error ' + error);
          throw new Error('There was an error retrieving the projects. Please try again.');
        });
    }

    return fetchStaticProjects()
      .then((projects) => {
        return projects
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .slice((page - 1) * limit, page * limit)
          .map(mapProject);
      })
      .catch((error) => {
        console.log('log client error ' + error);
        throw new Error('There was an error retrieving the projects. Please try again.');
      });
  },

  put(project) {
    if (isDev) {
      return fetch(`${apiBaseUrl}/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify(project),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(delay(2000))
        .then(checkStatus)
        .then(parseJSON)
        .then(mapProject)
        .catch((error) => {
          console.log('log client error ' + error);
          throw new Error('There was an error updating the project. Please try again.');
        });
    }

    console.warn('PUT operations are not supported in production mode');
    return Promise.resolve(project);
  },
};

export { projectAPI };