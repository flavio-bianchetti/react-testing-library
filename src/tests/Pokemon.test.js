import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(

  'Teste o componente "Podemon"...',
  () => {
    let myRender = null;
    beforeEach(() => {
      myRender = renderWithRouter(<App />);
    });
    test(

      'se é renderizado um card com as informações de determinado pokémon.',
      () => {
        expect(screen.getByText('Pikachu')).toBeInTheDocument();
        expect(screen.getAllByText('Electric')).toHaveLength(2);

        const linkPokemon = screen.getByRole('link', { name: /more details/i });
        expect(linkPokemon).toBeInTheDocument();
        userEvent.click(linkPokemon);

        expect(screen.getByText('Pikachu')).toBeInTheDocument();

        expect(screen.getByText('Electric')).toBeInTheDocument();

        expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
        expect(screen.getByText(/Average weight: 6.0 kg/i)).toBeInTheDocument();

        const imagesEl = screen.getAllByRole('img');
        expect(imagesEl[0]).toHaveAttribute(
          'src',
          'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        );
        expect(imagesEl[0]).toHaveAttribute(
          'alt',
          'Pikachu sprite',
        );
      },
    );
    test(

      'se o card do Pokémon indicado na Pokédex contém um link de navegação'
      + ' para exibir detalhes deste Pokémon. O link deve possuir a URL '
      + ' "/pokemons/<id>", onde "<id>" é o id do Pokémon exibido;',
      () => {
        const linkPokemon = screen.getByRole('link', { name: /more details/i });
        expect(linkPokemon).toBeInTheDocument();
        expect(linkPokemon).toHaveAttribute(
          'href',
          '/pokemons/25',
        );
      },
    );

    test(
      'Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
      + ' da aplicação para a página de detalhes de Pokémon.',
      () => {
        const linkPokemon = screen.getByRole('link', { name: /more details/i });
        expect(linkPokemon).toBeInTheDocument();
        userEvent.click(linkPokemon);

        expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
      },
    );
    test(

      'se também a URL exibida no navegador muda para "/pokemon/<id>", onde "<id>"'
      + ' é o id do Pokémon cujos detalhes se deseja ver;',
      () => {
        const linkPokemon = screen.getByRole('link', { name: /more details/i });
        expect(linkPokemon).toBeInTheDocument();
        userEvent.click(linkPokemon);
        expect(myRender.history.location.pathname).toBe('/pokemons/25');
      },
    );

    test(
      'se existe um ícone de estrela nos Pokémons favoritados.',
      () => {
        const linkPokemon = screen.getByRole('link', { name: /more details/i });
        expect(linkPokemon).toBeInTheDocument();
        userEvent.click(linkPokemon);
        expect(screen.getByText('Pikachu Details')).toBeInTheDocument();

        const inputPokemonFavorite = screen.getByLabelText('Pokémon favoritado?');
        expect(inputPokemonFavorite).toBeInTheDocument();
        userEvent.click(inputPokemonFavorite);

        const imagesEl = screen.getAllByRole('img');
        expect(imagesEl[1]).toBeInTheDocument();
        expect(imagesEl[1]).toHaveAttribute(
          'src',
          '/star-icon.svg',
        );
        expect(imagesEl[1]).toHaveAttribute(
          'alt',
          'Pikachu is marked as favorite',
        );
      },
    );
  },
);
