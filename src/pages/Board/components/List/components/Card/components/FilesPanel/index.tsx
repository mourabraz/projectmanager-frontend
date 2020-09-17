import React from 'react';

import { IFiile } from '../../../../../../../../interfaces';

import FileItem from './components/FileItem';

import { Container } from './styles';

interface IFilesPanelProps {
  fiiles: IFiile[];
}
const FilesPanel: React.FC<IFilesPanelProps> = ({ fiiles }) => {
  return (
    <Container>
      {fiiles.map((f) => (
        <FileItem key={f.id} fiile={f} />
      ))}
    </Container>
  );
};

export default FilesPanel;
