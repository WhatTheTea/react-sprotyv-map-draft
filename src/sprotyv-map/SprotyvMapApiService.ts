// Libs
import axios from 'axios'
// Modules
import IMilcom from "./IMilcom"

class SprotyvMapApi
{
    static readonly apiUrl = 'http://localhost:5000'

    private districts : Record<string, IMilcom[]> | null = null
    
    public async getDistricts() 
    {
        try {
            if (this.districts === null)
            {
                const {data: response, status} = await axios.get<Record<string, IMilcom[]>>(
                    `${SprotyvMapApi.apiUrl}/get/districts`,
                    {
                        headers: {
                            Accept: 'application/json'
                        }
                    }
                    )
                this.districts = response
            }
            return this.districts
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log('error message: ', e.message);
                return null
              } else {
                console.log('unexpected error: ', e);
                return null
              }
        }
    }

    constructor()
    {

    }
}

export default SprotyvMapApi