# React Query Implementation Examples

Here are examples of how to implement React Query in your different components:

## Projects Page:

```jsx
import { useProjects, useCreateProject } from '@/hooks/useProjects';

function Projects() {
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();

  const handleCreateProject = async (data) => {
    try {
      await createProject.mutateAsync(data);
      // Handle success (e.g., show toast, redirect)
    } catch (error) {
      // Handle error
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    // Your existing JSX
  );
}
```

## Project Details:

```jsx
import { useProject, useProjectMembers, useProjectTasks } from '@/hooks/useProjects';

function ProjectDetails({ id }) {
  const { data: project } = useProject(id);
  const { data: members } = useProjectMembers(id);
  const { data: tasks } = useProjectTasks(id);

  return (
    // Your existing JSX
  );
}
```

## Tasks Page:

```jsx
import { useTasks, useUpdateTaskStatus } from '@/hooks/useTasks';

function Tasks() {
  const { data: tasks, isLoading } = useTasks();
  const updateStatus = useUpdateTaskStatus();

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateStatus.mutateAsync(newStatus);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    // Your existing JSX
  );
}
```

## Team Members:

```jsx
import { useTeamMembers, useDepartments, useRoles } from '@/hooks/useTeam';

function TeamMembers() {
  const { data: members } = useTeamMembers();
  const { data: departments } = useDepartments();
  const { data: roles } = useRoles();

  return (
    // Your existing JSX
  );
}
```

## Forms with Mutations:

```jsx
import { useCreateClient } from '@/hooks/useClients';

function ClientForm() {
  const createClient = useCreateClient();

  const handleSubmit = async (formData) => {
    try {
      await createClient.mutateAsync(formData);
      // Handle success (e.g., show toast, redirect)
    } catch (error) {
      // Handle error
    }
  };

  return (
    // Your existing form JSX
  );
}
```

## Using with Filters:

```jsx
import { useProjects } from '@/hooks/useProjects';

function ProjectList() {
  const [filters, setFilters] = useState({
    status: '',
    assignee: '',
  });

  const { data: projects, isLoading } = useProjects(filters);

  // The query will automatically refetch when filters change
  return (
    // Your existing JSX
  );
}
```

To use these in your components:

1. Import the relevant hooks from the hooks directory
2. Use the hooks to fetch data and handle mutations
3. Handle loading and error states
4. Use the data in your components

Remember:

- Queries automatically cache and refetch data
- Mutations automatically invalidate relevant queries
- Use isLoading and isError for proper loading states
- The data will be automatically updated when mutations succeed
