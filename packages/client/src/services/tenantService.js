import api from '../config/api';

const TenantAuthService = {
  login: async (email_or_phone, password) => {
    try {
      const response = await api.post('/auth/tenant/login', {
        email_or_phone,
        password,
      });

      if (response && response.data) {
        const { token, tenant } = response.data;
        if (token && tenant) {
          localStorage.setItem('tenantToken', token);
          localStorage.setItem('tenantId', tenant.id);
          return { success: true, tenantId: tenant.id };
        } else {
          return {
            success: false,
            message: 'No token or tenant found in response',
          };
        }
      } else {
        return { success: false, message: 'Invalid response data' };
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return { success: false, message: error.response.data.message };
      } else {
        return {
          success: false,
          message: 'An error occured while loggin in',
        };
      }
    }
  },

  loginWithGoogle: async () => {
    try {
      const response = await api.get('/auth/tenant/google');
      if (response && response.data) {
        const { token, tenant } = response.data;
        if (token && tenant) {
          localStorage.setItem('tenantToken', token);
          localStorage.setItem('tenantId', tenant.id);
          return { success: true, tenantId: tenant.id };
        } else {
          return { success: false, message: 'No token or tenant found' };
        }
      } else {
        return { success: false, message: 'Invalid response data' };
      }
    } catch (error) {
      return {
        success: false,
        message: 'An error occured while loggin in with Google',
      };
    }
  },
  getTenantToken: () => {
    return localStorage.getItem('tenantToken');
  },
  getTenantId: () => {
    return localStorage.getItem('tenantId');
  },
  logout: () => {
    localStorage.removeItem('tenantToken');
    localStorage.removeItem('tenantId');
  },
};

export default TenantAuthService;
