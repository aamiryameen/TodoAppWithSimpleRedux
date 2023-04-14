import { getApi } from "../src/services";

it("api testing", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
        let result = new Promise((resolve, reject) => {
            resolve(
                {
                    json: () =>{
                        return {userId: 11}
                    }   
                }
                ) 
                reject({
                    json: (error) =>{

                        return error
                    }
                })
    })
    console.log('result', result)
    return result;
})
    const response = await getApi()
    console.log('res in mock', response)
    expect(response.userId).toBe(11);
})