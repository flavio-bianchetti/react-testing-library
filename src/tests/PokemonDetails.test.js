import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(

  'Teste o compomente "PokemonDetails"...',
  () => {
    beforeEach(() => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /more details/i }));
    });

    test(

      'Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
      () => {
        expect(screen.getByText('Pikachu Details'))
          .toBeInTheDocument();

        expect(screen.queryByRole('link', { name: /more details/i }))
          .not.toBeInTheDocument();

        expect(screen.getByRole('heading', { name: /summary/i, level: 2 }))
          .toBeInTheDocument();

        expect(screen.getByText('This intelligent Pokémon roasts hard berries with'
        + ' electricity to make them tender enough to eat.'))
          .toBeInTheDocument();
      },
    );

    test(

      'se existe na página uma seção com os mapas contendo as localizações do pokémon',
      () => {
        expect(screen.getByRole(
          'heading',
          {
            name: /game locations of pikachu/i,
            level: 2,
          },
        )).toBeInTheDocument();

        expect(screen.getByText('Kanto Viridian Forest'))
          .toBeInTheDocument();
        expect(screen.getByText('Kanto Power Plant'))
          .toBeInTheDocument();

        const imagesEl = screen.getAllByRole('img');
        // console.log(imagesEl);
        expect(imagesEl[1]).toHaveAttribute(
          'src',
          'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        );
        expect(imagesEl[2]).toHaveAttribute(
          'src',
          'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        );

        expect(screen.queryAllByAltText('Pikachu location'))
          .toHaveLength(2);
      },
    );

    test(

      'Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
      () => {
        const inputPokemonFavorite = screen.getByLabelText('Pokémon favoritado?');
        expect(inputPokemonFavorite).toBeInTheDocument();
        expect(inputPokemonFavorite).toHaveAttribute('type', 'checkbox');

        userEvent.click(inputPokemonFavorite);
        let imagesEl = screen.getAllByRole('img');
        expect(imagesEl[1]).toBeInTheDocument();
        expect(imagesEl[1]).toHaveAttribute(
          'src',
          '/star-icon.svg',
        );

        userEvent.click(inputPokemonFavorite);
        imagesEl = screen.getAllByRole('img');
        expect(imagesEl[1]).not.toHaveAttribute(
          'src',
          '/star-icon.svg',
        );
      },
    );
  },
);
