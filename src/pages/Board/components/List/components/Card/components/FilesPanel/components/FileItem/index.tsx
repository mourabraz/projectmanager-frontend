import React from 'react';

import { IFiile } from '../../../../../../../../../../interfaces';

import { Container, Content } from './styles';

interface IFileItemProps {
  fiile: IFiile;
}

const FileItem: React.FC<IFileItemProps> = ({ fiile }) => {
  return (
    <Container>
      <Content>
        {fiile.type === 'IMAGE' && (
          <img src={`${fiile.url}/thumbnail`} alt={fiile.name} />
        )}
      </Content>
    </Container>
  );
};

export default FileItem;
