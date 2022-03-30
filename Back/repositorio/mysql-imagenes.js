const connection = require('./mysqlConnection')


const postImage = async ({imageSave}) => {
    let result

        [result] = await connection.query('INSERT INTO imagenes SET ?', {titulo: imageSave.titulo,Imagen: imageSave.Imagen})

    if (!result.affectedRows) return false

    return {titulo: imageSave.titulo,Imagen: imageSave.Imagen}
}

const getImage = async () => {
    const [imagenes] = await  connection.query('select * from imagenes')

    if (!imagenes) return false

    return imagenes
}

const editImage = async ({id, imageSave }) => {

    const [result] = await  connection.query('select titulo, Imagen from imagenes where id = ?', [id])

    if (!result.length) return

    if (!! imageSave.Imagen) {
        const result2 = await connection.query('UPDATE imagenes SET Imagen = ? WHERE id = ?', [ imageSave.Imagen, id])
    }
    if (!! imageSave.titulo) {
        const result2 = await connection.query('UPDATE imagenes SET titulo = ? WHERE id = ?', [ imageSave.titulo, id])
    }



    return true
}

const deleteImage = async ({id}) => {

    const [result] = await  connection.query('DELETE FROM imagenes WHERE id = ?', [id])

    if (!result.affectedRows) return

    return true
}

module.exports = {
    postImage,
    getImage,
    editImage,
    deleteImage
}
