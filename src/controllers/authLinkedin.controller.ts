import { Request, Response } from 'express';
import axios from 'axios';



export const authorizeLinkedIn = (req: Request, res: Response) => {
  console.log("LLEGA A ENTRAR A ACA")
  const { LINKEDIN_CLIENT_ID, LINKEDIN_CALLBACK_URL } = process.env;
  const scope = 'r_liteprofile r_emailaddress'; // Ámbitos de acceso solicitados

  const redirectUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${LINKEDIN_CALLBACK_URL}&state=foobar&scope=${scope}`;

  res.redirect(redirectUrl);
};

export const handleLinkedInCallback = async (req: Request, res: Response) => {
  const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, LINKEDIN_CALLBACK_URL } = process.env;
  const { code } = req.query;

  try {
    const accessTokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
        redirect_uri: LINKEDIN_CALLBACK_URL,
      },
    });

    const accessToken = accessTokenResponse.data.access_token;

    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Aquí puedes hacer algo con los datos del perfil del usuario
    const userProfile = profileResponse.data;

    res.send(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la autenticación de LinkedIn');
  }
};
