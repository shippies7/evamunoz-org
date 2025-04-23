const express = require('express')
const crypto = require('crypto')
const router = express.Router()

router.get('/', (req, res) => {
  const iat = Math.round(new Date().getTime() / 1000) - 30
  const exp = iat + 60 * 60 * 2

  const oHeader = { alg: 'HS256', typ: 'JWT' }
  const oPayload = {
    sdkKey: process.env.ZOOM_SDK_KEY,
    mn: process.env.ZOOM_MEETING_ID,
    role: 0,
    iat,
    exp,
    appKey: process.env.ZOOM_SDK_KEY,
    tokenExp: exp
  }

  const sHeader = Buffer.from(JSON.stringify(oHeader)).toString('base64')
  const sPayload = Buffer.from(JSON.stringify(oPayload)).toString('base64')
  const signature = `${sHeader}.${sPayload}`

  const hash = crypto
    .createHmac('sha256', process.env.ZOOM_SDK_SECRET)
    .update(signature)
    .digest('base64')

  const rawSig = `${signature}.${hash}`
  const finalSig = Buffer.from(rawSig).toString('base64')

  res.json({ signature: finalSig }) // 👈 Acá es importante que sea JSON
})

module.exports = router
