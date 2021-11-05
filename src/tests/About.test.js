import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(

  'Teste se a página contém as informações sobre a Pokédex.',
  () => {
    beforeEach(() => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByText(/About/i));
    });

    test(

      'Teste se a página contém um heading "h2" com o texto "About Pokédex".',
      () => {
        const heading = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
        expect(heading).toBeInTheDocument();
      },
    );

    test(

      'Teste se a página contém dois parágrafos com texto sobre a Pokédex.',
      () => {
        const pEl1 = screen.getByText(/This application simulates a Pokédex, a digital/i);
        const pEl2 = screen.getByText(/One can filter Pokémons by type, and see more/i);
        expect(pEl1).toBeInTheDocument();
        expect(pEl2).toBeInTheDocument();
      },
    );

    test(

      'Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.'
      + 'net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.',
      () => {
        const imgEl = screen.getByRole('img');
        expect(imgEl).toBeInTheDocument();
        expect(imgEl).toHaveAttribute(
          'src',
          'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_'
          + 'I_Pok%C3%A9dex.png',
        );
      },
    );
  },
);
