import UsersModel from '@models/UsersModel'
import { Router } from 'express'

const router = Router()

router.get('/', async (_, res) => {
  try {
    const contacts = await UsersModel.findAll()

    res.send(contacts)
  } catch (err) {
    res.status(500).json('Opss, algo deu errado enquanto buscávamos esses contatos!')
  }
})

router.post('/create', async (req, res) => {
  const {
    name,
    email,
    phone,
    categories,
  } = req.body

  let canKeep: boolean = true
  const message: string[] = []

  if (!name) {
    canKeep = false
    message.push('O campo "Nome" é obrigatório')
  }

  if (!email) {
    canKeep = false
    message.push('O campo "E-mail" é obrigatório')
  }

  if (!phone) {
    canKeep = false
    message.push('O campo "Telefone" é obrigatório')
  }

  if (!categories) {
    canKeep = false
    message.push('O campo "Categoria(s)" é obrigatório')
  }

  if (!canKeep) {
    return res.status(422).json({
      error: message,
    })
  }

  try {
    const newContact = await UsersModel.create({ ...req.body })

    res.send(newContact)
  } catch (error) {
    return res.status(500).json({ error: 'Opss, deu algum erro aqui. Tente criar um novo contato em breve...' })
  }
})

router.post('/edit', async (req, res) => {
  const {
    id,
    name,
    phone,
    email,
    categories,
  } = req.body

  let canKeep: boolean = true
  const message: string[] = []

  if (!id) {
    canKeep = false
    message.push('O ID é obrigatório')
  }

  if (!canKeep) {
    return res.status(422).json({
      error: message,
    })
  }

  try {
    const params: any = {}

    if (name) {
      params.name = name
    }

    if (phone) {
      params.phone = phone
    }

    if (email) {
      params.email = email
    }

    if (categories) {
      params.categories = categories
    }

    await UsersModel.update(
      params,
      {
        where: { id },
      },
    )

    return res.send('Contato atualizado com sucesso')
  } catch (error) {
    return res.status(500).json(`Erro ao atualizar contato: ${error}`)
  }
})

export default router
