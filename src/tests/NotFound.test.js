import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(

  'Teste o componente "NotFound" se...',
  () => {
    beforeEach(() => {
      const { history } = renderWithRouter(<App />);
      history.push('/pagina/que-nao-existe/');
    });

    test(

      'se página contém um heading h2 com o texto "Page requested not found 😭".',
      () => {
        const heading = screen.getByRole(
          'heading',
          { name: /page requested not found/i },
        );
        expect(heading).toBeInTheDocument();
      },
    );

    test(

      'se página mostra a imagem https://media.giphy.com/media/'
      + 'kNSeTs31XBZ3G/giphy.gif.',
      () => {
        const image = screen.getAllByRole('img');
        expect(image[1]).toHaveAttribute(
          'src',
          'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
        );
      },
    );
  },
);
