import React, { useState } from 'react';

import PageLoading from '../../components/PageLoading';
import Tabs from '../../components/Tabs';

import { Container, Content } from './styles';
import SignIn from './SignIn';
import SignUp from './SignUp';

const SignInSignUp: React.FC = () => {
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
  const [signInLoading, setSignInLoading] = useState<boolean>(false);

  return (
    <>
      <PageLoading visible={signInLoading || signUpLoading} contentPadding={80}>
        {signInLoading && <p>loading sign in</p>}
        {signUpLoading && <p>loading sign up</p>}
      </PageLoading>

      <Container>
        <h1>Projects Manager App</h1>

        <Content>
          <Tabs defaultTabName="signin">
            <Tabs.Tab tabName="signin">Sign In</Tabs.Tab>
            <Tabs.Tab tabName="signup">Sign Up</Tabs.Tab>

            <Tabs.Panel tabName="signin">
              <SignIn setSignInLoading={setSignInLoading} />
            </Tabs.Panel>
            <Tabs.Panel tabName="signup">
              <SignUp
                setSignUpLoading={setSignUpLoading}
                setSignInLoading={setSignInLoading}
              />
            </Tabs.Panel>
          </Tabs>
        </Content>

        <a href="forgot">Forgot your password</a>
      </Container>
    </>
  );
};

export default SignInSignUp;
