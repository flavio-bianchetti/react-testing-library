import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(

  'Teste no componente "Pokedex"...',
  () => {
    beforeEach(() => renderWithRouter(<App />));
    test(

      'se a página contém um heading "h2" com o texto "Encountered pokémons".',
      () => {
        expect(
          screen.getByRole('heading', { name: /encountered pokémons/i, level: 2 }),
        ).toBeInTheDocument();
      },
    );
    test(

      'se é exibido o próximo Pokémon da lista quando o botão "Próximo pokémon" é'
      + ' clicado.',
      () => {
        const numOfInteractions = 7;
        let nameOfPokemon = screen.getByText('Pikachu');
        expect(nameOfPokemon).toBeInTheDocument();
        const nextButton = screen
          .getByRole('button', { name: /próximo pokémon/i });
        expect(nextButton).toBeInTheDocument();
        userEvent.click(nextButton);
        nameOfPokemon = screen.getByText('Charmander');
        expect(nameOfPokemon).toBeInTheDocument();
        for (let index = 0; index < numOfInteractions; index += 1) {
          userEvent.click(nextButton);
        }
        nameOfPokemon = screen.getByText('Dragonair');
        expect(nameOfPokemon).toBeInTheDocument();
        userEvent.click(nextButton);
        nameOfPokemon = screen.getByText('Pikachu');
        expect(nameOfPokemon).toBeInTheDocument();
      },
    );
    test(

      'se é mostrado apenas um Pokémon por vez.',
      () => {
        const dataTestId = 'pokemon-name';
        let namesOfPokemons = screen.getAllByTestId(dataTestId);
        expect(namesOfPokemons).toHaveLength(1);
        const nextButton = screen
          .getByRole('button', { name: /próximo pokémon/i });
        expect(nextButton).toBeInTheDocument();
        userEvent.click(nextButton);
        namesOfPokemons = screen.getAllByTestId(dataTestId);
        expect(namesOfPokemons).toHaveLength(1);
        userEvent.click(nextButton);
        userEvent.click(nextButton);
        namesOfPokemons = screen.getAllByTestId(dataTestId);
        expect(namesOfPokemons).toHaveLength(1);
      },
    );
    test(

      'se a Pokédex tem os botões de filtro.',
      () => {
        const numOfButtonsExpected = 7;
        const allButton = screen
          .getByRole('button', { name: /all/i });
        expect(allButton).toBeInTheDocument();
        const buttons = screen.getAllByTestId('pokemon-type-button');
        expect(buttons).toHaveLength(numOfButtonsExpected);
        expect(buttons[0]).toHaveTextContent('Electric');
        expect(buttons[1]).toHaveTextContent('Fire');
        expect(buttons[2]).toHaveTextContent('Bug');
        expect(buttons[3]).toHaveTextContent('Poison');
        expect(buttons[4]).toHaveTextContent('Psychic');
        expect(buttons[5]).toHaveTextContent('Normal');
        expect(buttons[6]).toHaveTextContent('Dragon');
        userEvent.click(buttons[0]);
        let typePokemonVisible = screen.getAllByText('Electric');
        expect(typePokemonVisible).toHaveLength(2);
        expect(allButton).not.toHaveAttribute('disabled');
        userEvent.click(buttons[1]);
        typePokemonVisible = screen.getAllByText('Fire');
        expect(typePokemonVisible).toHaveLength(2);
        expect(allButton).not.toHaveAttribute('disabled');
        userEvent.click(buttons[2]);
        typePokemonVisible = screen.getAllByText('Bug');
        expect(typePokemonVisible).toHaveLength(2);
        expect(allButton).not.toHaveAttribute('disabled');
        userEvent.click(buttons[3]);
        typePokemonVisible = screen.getAllByText('Poison');
        expect(typePokemonVisible).toHaveLength(2);
        expect(allButton).not.toHaveAttribute('disabled');
        userEvent.click(buttons[4]);
        typePokemonVisible = screen.getAllByText('Psychic');
        expect(typePokemonVisible).toHaveLength(2);
        expect(allButton).not.toHaveAttribute('disabled');
        userEvent.click(buttons[5]);
        typePokemonVisible = screen.getAllByText('Normal');
        expect(typePokemonVisible).toHaveLength(2);
        expect(allButton).not.toHaveAttribute('disabled');
        userEvent.click(buttons[6]);
        typePokemonVisible = screen.getAllByText('Dragon');
        expect(typePokemonVisible).toHaveLength(2);
        expect(allButton).not.toHaveAttribute('disabled');
      },
    );
    test(

      'se a Pokédex contém um botão para resetar o filtro.',
      () => {
        const buttonAll = screen.getByRole(
          'button',
          { name: 'All' },
        );
        expect(buttonAll).toBeInTheDocument();
        let nameOfPokemon = screen.getByText('Pikachu');
        expect(nameOfPokemon).toBeInTheDocument();
        const nextButton = screen.getByRole(
          'button',
          { name: /próximo pokémon/i },
        );
        userEvent.click(nextButton);
        nameOfPokemon = screen.getByText('Charmander');
        expect(nameOfPokemon).toBeInTheDocument();
        const DragonButton = screen.getByRole(
          'button',
          { name: /dragon/i },
        );
        expect(DragonButton).toBeInTheDocument();
        userEvent.click(DragonButton);
        const typePokemonVisible = screen.getAllByText('Dragon');
        expect(typePokemonVisible).toHaveLength(2);
        expect(nextButton).toHaveAttribute('disabled');
        userEvent.click(buttonAll);
        expect(nextButton).not.toHaveAttribute('disabled');
        nameOfPokemon = screen.getByText('Pikachu');
        expect(nameOfPokemon).toBeInTheDocument();
        userEvent.click(nextButton);
        nameOfPokemon = screen.getByText('Charmander');
        expect(nameOfPokemon).toBeInTheDocument();
      },
    );
  },
);
