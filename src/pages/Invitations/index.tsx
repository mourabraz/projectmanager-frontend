/* eslint-disable react/jsx-curly-newline */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useCallback } from 'react';
import { FiUserX, FiCheckSquare, FiX } from 'react-icons/fi';
import { utcToZonedTime, format } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';

import { IInvitation } from '../../interfaces';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import PageLoading from '../../components/PageLoading';

import { Colors } from '../../styles/colors';
import { Container, ContentTable, Button } from './styles';

const Invitations: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [invitations, setInvitations] = useState<
    (IInvitation & { formatedCreatedAt: string; formatedAcceptedAt: string })[]
  >([]);
  const [invitationFromMe, setInvitationFromMe] = useState<
    (IInvitation & { formatedCreatedAt: string; formatedAcceptedAt: string })[]
  >([]);
  const [invitationToMe, setInvitationToMe] = useState<
    (IInvitation & { formatedCreatedAt: string; formatedAcceptedAt: string })[]
  >([]);

  const { user } = useAuth();

  useEffect(() => {
    async function load(): Promise<void> {
      setLoading(true);
      const response = await api.get<
        (IInvitation & {
          formatedCreatedAt: string;
          formatedAcceptedAt: string;
        })[]
      >('invitations');

      setInvitations(
        response.data.map((i) => ({
          ...i,
          formatedCreatedAt: format(
            utcToZonedTime(i.createdAt, 'Europe/Lisbon'),
            "dd 'de' MMMM 'de' yyyy 'às' hh:mm",
            { timeZone: 'Europe/Lisbon', locale: pt },
          ),
          formatedAcceptedAt: i.acceptedAt
            ? format(
                utcToZonedTime(i.acceptedAt, 'Europe/Lisbon'),
                "dd 'de' MMMM 'de' yyyy 'às' hh:mm",
                { timeZone: 'Europe/Lisbon', locale: pt },
              )
            : '',
        })),
      );

      setLoading(false);
    }

    load();
  }, []);

  useEffect(() => {
    setInvitationFromMe(invitations.filter((i) => i.userId === user.id));
    setInvitationToMe(invitations.filter((i) => i.emailTo === user.email));
  }, [invitations, user]);

  const handleAcceptOrLeave = useCallback(
    async (id: string, action: 'accept' | 'leave') => {
      const response = await api.patch(`invitations/${id}/${action}`);
      if (response.data.id) {
        const updatedInvitations = invitations.map((i) => {
          if (i.id === id) {
            return {
              ...i,
              acceptedAt: response.data.acceptedAt,
            };
          }

          return i;
        });

        setInvitations(updatedInvitations);
      }
    },
    [invitations],
  );

  const handleGiveUpOrExpel = useCallback(
    async (id: string) => {
      const response = await api.delete(`invitations/${id}`);
      if (response.data) {
        setInvitations(invitations.filter((i) => i.id !== id));
      }
    },
    [invitations],
  );

  return (
    <>
      <PageLoading visible={loading}>
        <p>
          <i>Loading all invitations from and to you</i>
        </p>
      </PageLoading>
      <Container>
        <ContentTable>
          <h2>To my own Project</h2>
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>To</th>
                <th>created at</th>
                <th>accepted at</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invitationFromMe.map((i) => (
                <tr key={i.id}>
                  <td className="text-left">{i.project?.name}</td>
                  <td className="text-left">{i.emailTo}</td>
                  <td className="text-center">{i.formatedCreatedAt}</td>
                  <td className="text-center">{i.formatedAcceptedAt}</td>
                  <td className="text-center">
                    {i.acceptedAt ? (
                      <Button
                        type="button"
                        className="cancel"
                        disabled={!i.acceptedAt}
                        onClick={(): Promise<void> => handleGiveUpOrExpel(i.id)}
                        title="Expel"
                      >
                        <FiUserX size={14} color={Colors.error} />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className="accept"
                        disabled={i.acceptedAt}
                        onClick={(): Promise<void> => handleGiveUpOrExpel(i.id)}
                        title="Givu Up"
                      >
                        <FiX size={14} color={Colors.info} />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ContentTable>

        <ContentTable>
          <h2>From someone Project</h2>
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>From</th>
                <th>created at</th>
                <th>accepted at</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invitationToMe.map((i) => (
                <tr key={i.id}>
                  <td className="text-left">{i.project?.name}</td>
                  <td className="text-left inviter-profile">
                    <img
                      src={i.inviter?.photo?.url}
                      alt={i.inviter?.name || i.inviter?.email}
                    />
                    <span>{i.inviter?.name || i.inviter?.email}</span>
                  </td>
                  <td className="text-center">{i.formatedCreatedAt}</td>
                  <td className="text-center">{i.formatedAcceptedAt}</td>
                  <td className="text-center">
                    {i.acceptedAt ? (
                      <Button
                        type="button"
                        className="cancel"
                        disabled={!i.acceptedAt}
                        onClick={(): Promise<void> =>
                          handleAcceptOrLeave(i.id, 'leave')
                        }
                        title="Leave"
                      >
                        <FiX size={14} color={Colors.error} />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className="accept"
                        disabled={i.acceptedAt}
                        onClick={(): Promise<void> =>
                          handleAcceptOrLeave(i.id, 'accept')
                        }
                        title="Accept"
                      >
                        <FiCheckSquare size={14} color={Colors.info} />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ContentTable>
      </Container>
    </>
  );
};

export default Invitations;
