import React from 'react';

//import { Text } from '~components';
import { Text } from '../../../../components';

import { Title, Container } from './styles';

export const Header = () => {
  return (
    <Container>
      <Title>
        <Text fontSize='h3' fontWeight='bold'>
          Cursos y Capacitaciones
        </Text>
      </Title>
    </Container>
  );
};
