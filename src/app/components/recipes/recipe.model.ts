export interface IRecipe {
  name: string;
  description: string;
  imagePath: string;
}

export class Recipe implements IRecipe {
  constructor(public name: string, public description: string, public imagePath: string) {}
}
