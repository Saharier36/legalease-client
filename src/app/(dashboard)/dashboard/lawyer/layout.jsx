import { requiredRole } from '@/core/session';

const LawyerLayout = async ({children}) => {
    await requiredRole('lawyer')
    return children
};

export default LawyerLayout;