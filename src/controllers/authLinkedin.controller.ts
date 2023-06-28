import { Request, Response } from 'express';
import axios from 'axios';

export const authLinkedinController = async (req: Request, res: Response) => {
  const { code } = req.query;
  const linkedinClientId = '778795asmyzj99';
  const linkedinClientSecret = 'BaP545f9DoYYQZWP';
  const redirectUri = 'http://localhost:4000/signin/linkedin';

  try {
    const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        client_id: linkedinClientId,
        client_secret: linkedinClientSecret,
        redirect_uri: redirectUri
      }
    });

    const accessToken = tokenResponse.data.access_token;

    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    const { firstName, lastName } = profileResponse.data;

    const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    const emailAddress = emailResponse.data.elements[0]['handle~'].emailAddress;

    const pictureResponse = await axios.get('https://api.linkedin.com/v2/me?projection=(profilePicture(displayImage~:playableStreams))', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    const profilePicture = pictureResponse.data.profilePicture['displayImage~'].elements[0].identifiers[0].identifier;

    // Hacer algo con los datos del usuario (por ejemplo, guardarlos en la base de datos)

    res.json({ firstName, lastName, email: emailAddress, profilePicture });
  } catch (error) {
    // Manejar errores apropiadamente
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos del usuario de LinkedIn' });
  }
};
