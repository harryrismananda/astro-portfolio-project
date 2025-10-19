# CMS Setup Guide

## Fixed TanStack Router Configuration

### Changes Made:

1. **Removed file-based routing** - TanStack Router's file-based routing requires a build step that wasn't configured
2. **Implemented manual router configuration** in `Main.tsx` with explicit route definitions
3. **Updated Sidebar** with proper navigation links and styling
4. **Fixed route paths** to work correctly with the router basepath

### Router Structure:

```
/cms (basepath)
├── / (index - redirects to /dashboard)
├── /dashboard (Dashboard view)
└── /projects (Projects management)
```

### Files Modified:

1. **`/src/cms/Main.tsx`**
   - Created manual route tree using `createRoute` and `createRootRoute`
   - Configured router with basepath `/cms`
   - Integrated Dashboard and Projects components inline
   - Added proper TypeScript types

2. **`/src/cms/components/Sidebar.tsx`**
   - Updated navigation links to use correct paths
   - Added Lucide icons (LayoutDashboard, FolderKanban, LogOut)
   - Improved styling with fixed sidebar (w-64, min-h-screen)
   - Added active state styling with `activeProps`
   - Implemented logout functionality

3. **`/src/pages/cms/index.astro`**
   - Added global CSS import for Tailwind styles
   - Set body styling (m-0 p-0 bg-gray-50)
   - Using `client:only="react"` directive for proper hydration

### How to Access:

1. Navigate to: `http://localhost:4321/cms`
2. Router will automatically redirect to `/cms#/dashboard`

### Routes Available:

- **Dashboard**: `/cms#/dashboard` - Shows project statistics cards
- **Projects**: `/cms#/projects` - Project management interface

### Navigation:

The sidebar uses TanStack Router's `<Link>` component with:
- Hover effects
- Active state highlighting (indigo background)
- Icons from Lucide React

### Next Steps:

To add more routes:

1. Create the component
2. Define route using `createRoute`:
```tsx
const newRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/new-route',
  component: NewComponent,
})
```
3. Add to route tree:
```tsx
const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  projectsRoute,
  newRoute, // Add here
])
```
4. Add link to Sidebar:
```tsx
<Link to="/new-route" className="...">
  New Route
</Link>
```

### Styling:

All components use Tailwind CSS classes. The CMS has:
- Dark sidebar (gray-900)
- Light content area (gray-50 background)
- Indigo accent colors for active states
- Responsive cards on dashboard

### Authentication:

The sidebar includes a logout button that:
- Clears the JWT token from localStorage
- Redirects to homepage

You can add route guards in the future by checking for token in route `beforeLoad` hooks.
