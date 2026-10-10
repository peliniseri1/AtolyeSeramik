// Cleans what a visitor types before it leaves the page (WhatsApp, email, the n8n webhook).
// React already escapes everything it renders; this is the second line, for systems downstream.
// SQL injection is stopped where a database is: n8n must write with parameterised queries, never string-built SQL.

export const LIMITS = { name: 80, contact: 120, note: 600 }

// control characters (keeps \n and \t), zero-width and bidi-override characters
// eslint-disable-next-line no-control-regex
const INVISIBLE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁦-⁩﻿]/g

export function cleanText(value, max, { multiline = false } = {}) {
  let text = String(value ?? '').normalize('NFC').replace(INVISIBLE, '')
  text = text.replace(/[<>]/g, '') // no markup can reach an HTML email or a dashboard
  text = multiline
    ? text.replace(/\r\n?/g, '\n').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n')
    : text.replace(/\s+/g, ' ')
  return text.trim().slice(0, max)
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^\+?[0-9][0-9 ()-]{6,19}$/

// a phone number or an email address, nothing else
export const isContact = (value) => EMAIL.test(value) || PHONE.test(value)
