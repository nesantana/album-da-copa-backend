import StickersModel from '@models/StickersModel'
import { verifyJWT } from '@utils/auth'
import { parseInfo } from '@utils/parseInfo'
import { Router } from 'express'

const router = Router()

router.get('/', verifyJWT, async (req: any, res) => {
  try {
    const album = await StickersModel.findOne({ where: { id_user: req.userId } })

    const albumParse = parseInfo(album)

    res.send({
      ...albumParse,
      countries: JSON.parse(albumParse.countries),
    })
  } catch (error) {
    res.status(500).json({ error: 'Não conseguimos buscar seu album' })
  }
})

router.post('/edit', verifyJWT, async (req: any, res) => {
  const {
    items,
    name,
  } = req.body

  if (!items) {
    return res.status(500).json({ error: 'Opss, você não enviou nenhum item.' })
  }

  if (!name) {
    return res.status(500).json({ error: 'Opss, você não enviou o nome do item a ser alterado.' })
  }

  try {
    const album = await StickersModel.findOne({ where: { id_user: req.userId } })

    const albumParse = parseInfo(album)
    albumParse.countries = JSON.parse(albumParse.countries)

    const newCountries = albumParse.countries.map(((country: any) => {
      if (country.name === name) {
        return {
          ...country,
          items,
        }
      }

      return country
    }))

    const newAlbum = {
      ...albumParse,
      countries: JSON.stringify(newCountries),
    }

    await StickersModel.update(
      newAlbum,
      {
        where: { id: newAlbum.id },
      },
    )

    res.send('Alterado com sucesso!')
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Não conseguimos buscar seu album' })
  }
})

export default router
