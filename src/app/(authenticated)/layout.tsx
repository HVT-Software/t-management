import { MainHeader } from '@shared/components/main-header';
import { navigationItems, NavigationSidebar } from '@shared/components/navigation-sidebar';

const AuthenticatedLayout: React.FC<WrappedComponentProps> = async ({ children }) => {
  return (
    <div className='flex h-full w-full'>
      <NavigationSidebar navItems={navigationItems} />
      <div className='main grow'>
        <MainHeader />
        <main>
          <div className='mx-auto w-[100svw] px-2 pb-4 md:w-full md:px-4'>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
