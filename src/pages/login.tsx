import React, { useContext, useState } from 'react';
import useUser from '../lib/useUser';
import LoginForm from '../components/LoginForm';
import fetchJson, { FetchError } from '../lib/fetchJson';
import { AppContext } from '../components/AppProvider';

export default function Login() {
  const {state} = useContext(AppContext);

  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: `/${state.guest.id}`,
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState('');

  return (<div>
    <div className="login">
      <LoginForm
        errorMessage={errorMsg}
        onSubmit={async function handleSubmit(event) {
          event.preventDefault();

          const body = {
            username: event.currentTarget.username.value,
          };

          try {
            mutateUser(
              await fetchJson('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
              }),
              false,
            );
          } catch (error) {
            if (error instanceof FetchError) {
              setErrorMsg(error.data.message);
            } else {
              console.error('An unexpected error happened:', error);
            }
          }
        }}
      />
    </div>
    <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style></div>
  );
}
