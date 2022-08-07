export const getUserLocation = (): Promise<[number, number]> => {
    return new Promise( (resolve, reject) => {

        navigator.geolocation.getCurrentPosition( 
            ({ coords }) => resolve([ coords.longitude, coords.latitude ]),
            ( err ) => {
                alert('cant get geolocation');
                console.log(err);
                reject();
            }
        )


    });
}