'use client';

import { createContext } from 'react';

export const AuthContext = createContext({
	isLogin: false,
	user: {
		name:'test',
    email: 'test@hotmail.com'
	},
});
