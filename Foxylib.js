function spawnItem(wrld, id, count, pos, tag) {
    let npc = wrld.spawnNpc('item', pos.x, pos.y+1, pos.z)
    let npcData = npc.getEntityData()
    
    npc.setMorph(mappet.createMorph("{BodyParts:[{T:[0.0f,-0.5f,0.0f],Limb:\"head\",Morph:{Name:\"item\",Stack:{id:\""+id+"\",Count:1b,Damage:0s}}}],Settings:{Hands:1b},Name:\"blockbuster.empty\"}"))
    npcData.setString('id', id)
    npcData.setInt('count', count)
    npcData.setString('tag', tag)
    npc.setRotations(0, Math.floor(mappet.random(-180, 180)), Math.floor(mappet.random(-180, 180)))
    
    if(id.startsWith('littletiles') || id.startsWith('chiselsandbits')) {
        npc.setMorph(mappet.createMorph("{Meta:0b,Block:\"minecraft:stone\",Name:\"block\"}"))
    }
    
    return npc
}
