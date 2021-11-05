import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(

  'Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    const numLinks = 4;
    test(

      'O primeiro link deve possuir o texto "Home". Teste se a aplicação é'
      + 'redirecionada para a página inicial, na URL "/" ao clicar no link'
      + '"Home" da barra de navegação.',
      () => {
        const { history } = renderWithRouter(<App />);

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(numLinks);
        expect(links[0]).toHaveTextContent('Home');

        userEvent.click(links[0]);
        expect(history.location.pathname).toBe('/');
      },
    );

    test(

      'O segundo link deve possuir o texto "About". Teste se a aplicação é'
      + 'redirecionada para a página de About, na URL "/about", ao clicar no'
      + 'link "About" da barra de navegação.',
      () => {
        const { history } = renderWithRouter(<App />);

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(numLinks);
        expect(links[1]).toHaveTextContent('About');

        userEvent.click(links[1]);
        expect(history.location.pathname).toBe('/about');
      },
    );

    test(

      'O terceiro link deve possuir o texto "Favorite Pokémons". Teste'
      + 'se a aplicação é redirecionada para a página de Pokémons Favoritados,'
      + 'na URL "/favorites", ao clicar no link "Favorite Pokémons" da barra de'
      + 'navegação.',
      () => {
        const { history } = renderWithRouter(<App />);

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(numLinks);
        expect(links[2]).toHaveTextContent('Favorite Pokémons');

        userEvent.click(links[2]);
        expect(history.location.pathname).toBe('/favorites');
      },
    );

    test(

      'Teste se a aplicação é redirecionada para a página Not Found ao entrar'
      + 'em uma URL desconhecida.',
      () => {
        const { history } = renderWithRouter(<App />);

        history.push('/pagina/que-nao-existe/');

        const notFoundTitle = screen.getByRole(
          'heading',
          { name: /Page requested not found/i, level: 2 },
        );
        expect(notFoundTitle).toBeInTheDocument();
      },
    );
  },

);
