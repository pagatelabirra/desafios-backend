import bCrypt from 'bcrypt';

export function createHash(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10))
}

export function isValidPassword(user, password){
    return bCrypt.compareSync(password, user.password)
}