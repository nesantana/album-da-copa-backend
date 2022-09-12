import UsersModel from '@models/UsersModel'
import StickersModel from '@models/StickersModel'
import { verifyJWT } from '@utils/auth'
import AlbumCopa from '@utils/ClassAlbum'
import { Credentials } from '@utils/credentials'
import { parseInfo } from '@utils/parseInfo'
import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

router.get('/find-me', verifyJWT, async (req: any, res) => {
  try {
    const user = await UsersModel.findOne({ where: { id: req.userId } })

    const userParse = parseInfo(user)

    delete userParse.password
    delete userParse.createdAt
    delete userParse.updatedAt

    res.send(userParse)
  } catch (error) {
    res.status(500).json({ error: 'Não conseguimos buscar seus dados' })
  }
})

router.get('/find-username', async (req: any, res) => {
  const { username } = req.query
  try {
    const user = await UsersModel.findOne({ where: { username } })

    const userParse = parseInfo(user)

    delete userParse.password
    delete userParse.createdAt
    delete userParse.updatedAt

    res.send(userParse)
  } catch (error) {
    res.status(500).json({ error: 'Não conseguímos validar' })
  }
})

router.post('/edit', verifyJWT, async (req: any, res) => {
  const {
    username,
    email,
    password,
    confirm_password,
    current_password,
  } = req.body

  if (password !== confirm_password) {
    return res.status(500).json({ error: 'O campo Senha e Confirmação de Senha precisam ser iguais' })
  }

  try {
    const user = await UsersModel.findOne({ where: { id: req.userId } })

    const userParsed = parseInfo(user)

    const decodePassword = Buffer.from(userParsed.password, 'base64').toString('utf8')

    if (decodePassword !== current_password) {
      return res.status(500).json({ error: 'Opss, parece que essa não é sua senha atual' })
    }

    if (username !== userParsed.username) {
      const findUsername = UsersModel.findOne({ where: { username } })

      if (findUsername) {
        return res.status(500).json({ error: 'Opss, este nome de usuário já está sendo utilizado!' })
      }
    }

    if (email !== userParsed.email) {
      const findEmail = UsersModel.findOne({ where: { email } })

      if (findEmail) {
        return res.status(500).json({ error: 'Opss, este e-mail já está sendo utilizado!' })
      }
    }

    const body = {
      username,
      email,
      password: Buffer.from(password, 'utf8').toString('base64'),
    }

    await UsersModel.update(
      body,
      {
        where: { id: req.userId },
      },
    )

    return res.send('Sucesso')
  } catch (err) {
    return res.status(500).json({ error: 'Opss, parece que algo deu errado.' })
  }
})

router.post('/create', async (req, res) => {
  const {
    username,
    email,
    password,
    confirm_password,
  } = req.body

  let canKeep: boolean = true
  const message: string[] = []

  if (!username) {
    canKeep = false
    message.push('O campo "Nome de usuário" é obrigatório')
  }

  if (!email) {
    canKeep = false
    message.push('O campo "E-mail" é obrigatório')
  }

  if (password !== confirm_password) {
    canKeep = false
    message.push('O campo Senha e Confirmação de Senha precisam ser iguais')
  }

  if (!canKeep) {
    return res.status(422).json({
      error: message,
    })
  }

  try {
    const userByUsername = await UsersModel.findOne({ where: { username } })

    if (userByUsername) {
      return res.status(500).json({ error: 'Opss, parece que esse nome de usuário já está sendo utilizado!' })
    }

    const userByEmail = await UsersModel.findOne({ where: { email } })

    if (userByEmail) {
      return res.status(500).json({ error: 'Opss, parece que esse e-mail já está sendo utilizado!' })
    }

    const body = {
      ...req.body,
      password: Buffer.from(password, 'utf8').toString('base64'),
    }

    const newContact = await UsersModel.create(body)

    const userParse = parseInfo(newContact)
    const newAlbum = new AlbumCopa(userParse.id).Stickers

    const album = await StickersModel.create({ ...newAlbum })

    const albumParse = parseInfo(album)

    delete userParse.password
    delete userParse.createdAt
    delete userParse.updatedAt

    res.send({
      ...userParse,
      album: {
        ...albumParse,
        countries: parseInfo(albumParse.countries),
      },
    })
  } catch (error) {
    return res.status(500).json({ error: 'Opss, deu algum erro aqui. Tente criar um novo contato em breve...' })
  }
})

router.post('/', async (req, res) => {
  const {
    user,
    password,
  } = req.body

  let canKeep: boolean = true
  const message: string[] = []

  if (!user) {
    canKeep = false
    message.push('O campo "Usuário/E-mail" é obrigatório')
  }

  if (!password) {
    canKeep = false
    message.push('O campo "Senha" é obrigatório')
  }

  if (!canKeep) {
    res.status(422).json({
      error: message,
    })
  }

  try {
    let userFind: any = null

    userFind = await UsersModel.findOne({ where: { email: user } })

    if (!userFind) {
      userFind = await UsersModel.findOne({ where: { username: user } })
    }

    const userParse = parseInfo(userFind)
    const decodePassword = Buffer.from(userParse.password, 'base64').toString('utf8')

    if (decodePassword !== password) {
      return res.status(500).json({ error: 'Opss, parece que você erro o usuário ou a senha' })
    }
    const token = jwt.sign({ id: userParse.id }, Credentials.secret, {
      expiresIn: '7d',
    })
    return res.json({ auth: true, token })
  } catch (error) {
    return res.status(500).json({ error: 'Não conseguimos validar esse usuário agora' })
  }
})

export default router
