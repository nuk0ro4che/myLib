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

function doClientGlowing(player, entity) {
    const DataParameter = Java.type("net.minecraft.network.datasync.DataParameter")
    const EntityDataManager = Java.type("net.minecraft.network.datasync.EntityDataManager")
    const SPacketEntityMetadata = Java.type("net.minecraft.network.play.server.SPacketEntityMetadata")
    
    const byteSerializer = Java.type("net.minecraft.network.datasync.DataSerializers").field_187191_a
    const Byte = Java.type("java.lang.Byte")
    const dataManager = entity.func_184212_Q();
    
    dataManager.func_187227_b(new DataParameter(0, byteSerializer), Byte.parseByte(0x40));
    player.field_71135_a.func_147359_a(new SPacketEntityMetadata(entity.func_145782_y(), dataManager, true));
}
