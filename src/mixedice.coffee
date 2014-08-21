udefine 'mixedice', ->
  
  mixedice = (target, params...) ->
    return unless target?
    return target if params.length is 0
    
    mixObject = (target, obj) ->
      splitObject = (obj) ->
        keys = Object.keys(obj)
        
        directObj = do ->
          result = {}
          
          for key in keys
            result[key] = obj[key]
          
          result
        
        protoObj = Object.getPrototypeOf(obj)
        
        [directObj, protoObj]
      
      if Array.isArray target
        splitted = splitObject obj
        
        mixObject target[0], splitted[0]
        mixObject target[1], splitted[1]
      else
        for key, value of obj when not Object.hasOwnProperty.call target, key
          target[key] = value
          
      null
      
    mixFunction = (target, func) -> func.call target
    
    for p in params
      if typeof p is 'function'
        mixFunction target, p
      else
        mixObject target, p
        
    target

# Our current CommonJS workaround
if udefine.env.commonjs
  udefine.require 'mixedice', (mixedice) -> module.exports = mixedice