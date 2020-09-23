/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import ImgCreateTaskGif from '../../assets/gifs/projectmanager-app-2.gif';
import ImgUploadTaskGif from '../../assets/gifs/projectmanager-app-3.gif';
import ImgInviteTaskGif from '../../assets/gifs/projectmanager-app-4.gif';
import ImgOrderTaskGif from '../../assets/gifs/projectmanager-app-5.gif';

import {
  Container,
  Content,
  Introduction,
  AlertaInfo,
  Examples,
  ImageGif,
} from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Content>
        <AlertaInfo>
          <p>
            Este sistema está online apenas com o propósito de expor o sistema,
            de forma a demonstrar algumas funcionalidades.
          </p>
          <p>
            <strong>
              Não se trata de um produto acabado e PORTANTO não deve ser usado
              com informações verdadeiras!
            </strong>
          </p>
          <p>
            Link do GitHub:{' '}
            <a
              href="https://github.com/mourabraz/projectmanager-frontend"
              target="blank"
            >
              https://github.com/mourabraz/projectmanager-frontend
            </a>
          </p>
          <p>O consumo da fila para o envio de emails está desligado.</p>

          {!user && (
            <p>
              Poderá realizar um login de teste ou criar uma nova conta. Por
              meio do link abaixo:
              <br />
              <br />
              <Link to="/login">Login</Link>
              <br />
              <br />
              <i>Teste com conta existente:</i>
              <br />
              <strong>email - </strong> carlos@teste.com <i>ou</i>{' '}
              rico@teste.com
              <br />
              <strong>senha - </strong> 12345678
            </p>
          )}

          <p>
            <br />
            <br />
            <i>Os dados serão apagados e recarregados quando necessário.</i>
            <br />
            <i>
              * Ao testar o sistema, peço a gentileza de não inserir conteúdo
              inapropriado.
            </i>
          </p>
        </AlertaInfo>

        <Introduction>
          <h1>O projeto &quot;Projects Manager&quot;</h1>

          <p>
            Projeto realizado para apoiar o gerenciamento de trarefas dentro de
            um conjunto de projetos.
          </p>

          <p>
            Cada usuário autênticado pode criar novos projetos e dividí-lo em
            diferentes tarefas sequênciais ou não.
          </p>

          <p>
            Cada tarefa pode ainda ser dividida em uma <i>check list</i> para
            facilitar as estapas necessárias à execução da tarefa.
          </p>

          <p>
            Para cada Tarefa é possível associar arquivos de imagens/pdf/texto.
          </p>

          <p>
            Os usuários podem partilhar um determinado Projecto com outro
            usuário por meio de convites.
          </p>
        </Introduction>

        <Examples>
          <h3># Crie um projeto Pessoal ou que vá compartilhar</h3>

          <hr />

          <h3># Adicione Tarefas</h3>

          <ImageGif>
            <img src={ImgCreateTaskGif} alt="Create Task On Project Gif" />
          </ImageGif>

          <hr />

          <h3># Adicione Imagens, PDFs ou arquivos</h3>

          <ImageGif>
            <img
              src={ImgUploadTaskGif}
              alt="Upload files to Task On Project Gif"
            />
          </ImageGif>

          <hr />

          <h3>
            # Convide outros usuários para que possam participar junto do mesmo
            porjeto!
          </h3>

          <ImageGif>
            <img src={ImgInviteTaskGif} alt="Invite users to Project Gif" />
          </ImageGif>

          <hr />

          <h3>
            # Organize os quadros e altere as ordens com <i>Drag and Drop</i>
          </h3>

          <ImageGif>
            <img src={ImgOrderTaskGif} alt="Order Tasks on Project Gif" />
          </ImageGif>
        </Examples>
      </Content>
    </Container>
  );
};

export default Dashboard;
