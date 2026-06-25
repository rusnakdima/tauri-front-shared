export function getDefaultSchema() {
  const welcomePage = {
    id: "welcome",
    name: "Welcome",
    elements: [
      {
        id: "welcome-header",
        componentId: "page-container",
        name: "Page Container",
        icon: "▦",
        position: { x: 0, y: 0, width: 800, height: 80 },
        props: {
          title: "Welcome to Designer",
          subtitle: "Create your first project to get started",
        },
        classes: "p-6",
        children: [],
        zIndex: 1,
      },
      {
        id: "welcome-empty-state",
        componentId: "empty-state",
        name: "Empty State",
        icon: "○",
        position: { x: 200, y: 150, width: 400, height: 200 },
        props: {
          icon: "add_circle",
          title: "No projects yet",
          message: "Create a new project to get started",
          actionLabel: "Create Project",
        },
        classes: "flex flex-col items-center justify-center p-8",
        children: [],
        zIndex: 1,
      },
    ],
  };
  return {
    id: "designer-default",
    name: "Designer",
    version: "3.0.0",
    pages: [welcomePage],
  };
}
//# sourceMappingURL=default-page.js.map
