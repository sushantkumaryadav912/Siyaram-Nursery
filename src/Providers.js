'use client';
import { Toaster } from 'react-hot-toast';
import React from 'react';

const Providers = ({ children }) => {
  return (
    <>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontSize: '17px',
            backgroundColor: '#15803d',
            color: 'white',
            borderRadius: '8px',
          },
        }}
      />
      {children}
    </>
  );
};

export default Providers;