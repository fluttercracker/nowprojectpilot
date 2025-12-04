import { useEffect, useState } from 'react';
import { projectAPI } from './projectAPI';
import ProjectDetail from './projectDetail';
import { useParams } from 'react-router';

function ProjectPage() {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      try {
        const data = await projectAPI.find(id);
        setProject(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [id]);

  return (
    <div>
      <h1>Project Detail</h1>

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span> {error}
              </p>
            </section>
          </div>
        </div>
      )}

      {project && <ProjectDetail project={project} />}
    </div>
  );
}

export default ProjectPage;