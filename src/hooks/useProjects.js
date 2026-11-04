import { useState, useEffect } from 'react';
import { projectsService } from '../services/projects.service';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await projectsService.getProjects();
      if (response.success) {
        setProjects(response.data);
      }
    } catch (err) {
      setError(err.message || 'حدث خطأ في جلب المشاريع');
      console.error('Projects fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (projectData) => {
    try {
      const response = await projectsService.createProject(projectData);
      if (response.success) {
        setProjects(prev => [response.data, ...prev]);
        return response;
      }
    } catch (err) {
      setError(err.message || 'حدث خطأ في إنشاء المشروع');
      throw err;
    }
  };

  return { projects, isLoading, error, refetch: fetchProjects, createProject };
}
