function Man(name, age) {

	if (typeof name !== 'string') {
		throw new Error('Invalid parameters: "name" must be a string!');
	} else {
		this._name = name;
	}

	if (typeof age !== 'number' || age < 0) {
		throw new Error('Invalid parameters: "age" must be a positive number!');
	} else {
		this._age = age;
	}

	Object.defineProperties(this, {
		name: {
			get: function() {
				return this._name;
			},

			set: function(nme) {
				this._name = nme;
			}
		},
		age: {
			get: function() {
				return this._age;
			}
		}
	});
}

Man.prototype.live = function() {
	console.log(this.name + ' is living!');
};

function Student(name, age) {
	Man.apply(this, arguments);
}

Student.prototype = Object.create(Man.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
	console.log(this._name + ' is studying!');
};

Student.prototype.askProffesorAbout = function(proffesor, that) {
	if (proffesor.isBusy) {
		throw new Error("You can't ask proffesor while he's busy!");
	} else if (proffesor.knows(that)) {
		return 'You listening carefully to proffesor gaining an answer you need';
	} else {
		return "Proffesor doesn't know about that!";
	}
};

function Proffesor(name, age, lvl) {
	Man.apply(this, arguments);
	this._expLvl = lvl || 1;
	this._knowledge = [
						{ name: 'BASICS', desc: 'A little about everything' }
					];
	this._busy = false;

	Object.defineProperties(this, {
		isBusy: {
			get: function() {
				return this._busy;
			}
		}
	});
}

Proffesor.prototype = Object.create(Student.prototype);
Proffesor.prototype.constructor = Proffesor;

Proffesor.prototype.teach = function() {
	this._expLvl += 1;
	this._busy = true;
	console.log('Proffesor is teaching his students!');
};

Proffesor.prototype.study = function(thing) {

	if (thing.name && thing.desc) {

		if (this.isBusy) {
			throw new Error("Can't study new - i'm busy!");
		}

		Student.prototype.study.apply(this);
		thing.name = thing.name.toUpperCase();
		this._knowledge.push(thing);
		this._expLvl += 1;

	} else {
		throw new Error('The model of added knowledge must be { name: "its name", desc: "its description"}! ');
	}

	
};

Proffesor.prototype.knows = function(that) {
	if (typeof that !== 'string') {
		throw new Error('Searching field must be a <string>');
	}

	var knowledge = this._knowledge;

	for (var i = 0; i < knowledge.length; i+=1) {
		if (knowledge[i].name === that.toUpperCase()) {
			return true;
		}
	}

	return false;
};

Proffesor.prototype.gotThingsDone = function() {
	this._busy = false;
}



var stud = new Student('Alex', 26);
stud.study();
var prof = new Proffesor('Dr John', 50, 100);
stud.askProffesorAbout(prof, 'basics');

//duckType function that recieve object as argument
function duckType(obj) {
	var objType;
	var context = obj || this;

	if (context.name && context.age && context.live) {

		objType = context.study? 'student' : 'man';
	}

	return objType;
}




