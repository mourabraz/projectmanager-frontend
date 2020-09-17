import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import logo from '../../assets/logo_xxxx144.png';

import { useAuth } from '../../hooks/auth';
import Button from '../Button';

import {
  Container,
  Content,
  Profile,
  ProfileImage,
  ProfileName,
} from './styles';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <img src={logo} alt="Projects Manager" />
          </Link>
          <NavLink to="/boards">
            <span>Boards</span>
          </NavLink>
          <NavLink to="/projects">
            <span>Projects</span>
          </NavLink>
          <NavLink to="/invitations">
            <span>Invitations</span>
          </NavLink>
        </nav>

        <Profile>
          <ProfileImage>
            <img
              width="60"
              height="60"
              src={
                user.photo
                  ? `${user.photo.url}/thumbnail`
                  : `https://api.adorable.io/avatars/285/${user.email}.png`
              }
              alt={user.name || user.email}
            />
          </ProfileImage>

          <ProfileName>
            <strong>{user.name || user.email}</strong>
            <Link to="/profile">Meu perfil</Link>
          </ProfileName>

          <Button type="button" kind="info" onClick={signOut}>
            <FiLogOut size={20} />
          </Button>
        </Profile>
      </Content>
    </Container>
  );
};

export default Header;
