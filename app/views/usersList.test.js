/// <reference types="vitest/globals" />
/**
 * @vitest-environment jsdom
 */
// app/views/test_usersList.ejs.js

import { describe, it, expect, beforeEach } from 'vitest'
import ejs from 'ejs'
import fs from 'fs'
import path from 'path'
import { screen } from '@testing-library/dom'

// Chemin vers le template
const templatePath = path.resolve(__dirname, 'usersList.ejs')
const template = fs.readFileSync(templatePath, 'utf-8')

// Fonction utilitaire pour rendre le template et injecter dans le DOM
function render(users) {
  const html = ejs.render(
    template,
    { users, session: { user: { picture: '', username: 'Test' } } }, // session factice
    { filename: templatePath }
  )
  document.body.innerHTML = html
}

describe('usersList.ejs', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })
it('affiche plusieurs utilisateurs avec leurs statuts respectifs', () => {
    render([
      { id: 1, username: 'Jean', isBanned: false },
      { id: 2, username: 'Marie', isBanned: true }
    ])
    expect(screen.getByText('Jean')).toBeTruthy()
    expect(screen.getByText('Marie')).toBeTruthy()
    expect(screen.getByText('Actif')).toBeTruthy()
    expect(screen.getByText('Banni')).toBeTruthy()
    expect(screen.getByText('Bannir')).toBeTruthy()
    expect(screen.getByText('Débannir')).toBeTruthy()
  })
})