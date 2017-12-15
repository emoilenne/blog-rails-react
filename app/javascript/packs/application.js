import React from 'react';
import { render } from 'react-dom';
import Posts from '../components/Posts';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.body.appendChild(document.createElement('div'));
  render(<Posts/>, container);
});
