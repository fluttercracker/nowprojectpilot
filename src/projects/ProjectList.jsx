import PropTypes from 'prop-types';
import { Project } from './project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { useState } from 'react';

function ProjectList({ projects, onSave }) {
    const [projectBeingEdited, setProjectBeingEdited] = useState();
    const handleEdit = (project) => {
        setProjectBeingEdited(project);
    };
    const cancelEditing = () => {
        setProjectBeingEdited(null);
    };

    return (
        <div className="row">
            {projects && projects.length > 0 ? (
                projects.map((project) => (
                    <div key={project.id} className="col-sm-12 col-md-6 col-lg-4">
                        {project === projectBeingEdited ? (
                            <ProjectForm onSave={onSave} onCancel={cancelEditing} project={project} />
                        ) : (
                            <ProjectCard project={project} onEdit={handleEdit} />
                        )}
                    </div>
                ))
            ) : null}
        </div>
    );
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
    onSave: PropTypes.func.isRequired,
};

export default ProjectList;