export const projectStatus = {
    inProgress: 'IN_PROGRESS',
    active: 'ACTIVE',
    completed: 'COMPLETED',
    onHold: 'ON_HOLD',
    abandoned: 'ABANDAONED'
}

export const taskStatus = {
    ...projectStatus,
    archived: 'ARCHIVED',
    abandoned: 'ABANDONED'
}

export const userRoles = {
    WORKSPACE_OWNER: 'Workspace Owner',
    PROJECT_MANAGER: 'Project Manager'
}

export const formatTimeFromSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds/60 - (hours * 60));
    const secs = Math.floor(seconds % 60);
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}