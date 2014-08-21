require 'udefine/global'
mixedice = require '../dist/mixedice'
{expect} = require 'chai'



describe 'mixedice', ->
  it 'empty parameters', ->
    result = mixedice()
    expect(result).to.be.a('undefined')
    expect(result).to.equal(undefined)

  it 'mixing in two objects', ->
    obj1 =
      a: 4
      
    obj2 =
      b: 'test'
      
    result = mixedice obj1, obj2
    expect(result).to.be.a('object')
    expect(result).to.deep.equal({a: 4, b: 'test'})

  it 'mixing in constructor functions', ->
    class First
      constructor: (@prop = 5) ->
        
      yellow: -> 'yellow'
      
    class Second
      constructor: ->
        mixedice [this, Second::], new First()
        
      a: ->

    second = new Second()
    expect(second).to.be.a('object')
    expect(second).to.be.a.instanceof(Second)
    expect(Second).to.be.a('function')
    expect(second.prop).to.be.a('number')
    expect(second.prop).to.equal(5)
    expect(Second::yellow).to.be.a('function')
    expect(second.yellow()).to.be.a('string')
    expect(second.yellow()).to.equal('yellow')
