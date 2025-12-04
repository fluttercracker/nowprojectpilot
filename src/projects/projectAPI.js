import { Project } from './project';

const isDev = import.meta.env.DEV;
const baseUrl = isDev ? 'http://localhost:4000' : './api';

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

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
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



const projectAPI = {
  find(id) {
    if (isDev) {
      return fetch(`${baseUrl}/projects/${id}`)
        .then(checkStatus)
        .then(parseJSON)
        .then(p => new Project(p));
    } else {
      return fetch(`${baseUrl}/db.json`)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
          const project = data.projects.find(p => p.id === parseInt(id));
          if (!project) throw new Error('Project not found');
          return new Project(project);
        });
    }
  },

  get(page = 1, limit = 10) {
    if (isDev) {
      return fetch(`${baseUrl}/projects?_page=${page}&_limit=${limit}&_sort=name`)
        .then(delay(2000))
        .then(checkStatus)
        .then(parseJSON)
        .then((projects) => {
          return projects.map((p) => {
            return new Project(p);
          });
        })
        .catch((error) => {
          console.log('log client error ' + error);
          throw new Error(
            'There was an error retrieving the projects. Please try again.'
          );
        });
    } else {
      return fetch(`${baseUrl}/db.json`)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
          const projects = data.projects
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice((page - 1) * limit, page * limit);
          return projects.map((p) => new Project(p));
        })
        .catch((error) => {
          console.log('log client error ' + error);
          throw new Error(
            'There was an error retrieving the projects. Please try again.'
          );
        });
    }
  },


  put(project) {
    if (isDev) {
      return fetch(`${baseUrl}/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify(project),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(delay(2000))
        .then(checkStatus)
        .then(parseJSON)
        .catch((error) => {
          console.log('log client error ' + error);
          throw new Error(
            'There was an error updating the project. Please try again.'
          );
        });
    } else {
      // In production, just return the project as-is since we can't update a static JSON file
      console.warn('PUT operations are not supported in production mode');
      return Promise.resolve(project);
    }
  },
};

export { projectAPI };