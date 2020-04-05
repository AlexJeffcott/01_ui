import { words } from './words'
import { numbers } from './numbers'
import { phrases } from './phrases'
import { courses } from './courses'
import { misc } from './misc'

const questions = [...words, ...numbers, ...phrases, ...misc]

export {
  questions,
  courses
}
