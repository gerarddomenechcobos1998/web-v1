export interface ProfileInterface {
    _id?: string,
    email: string,
    name?: string
}


export class ProfileModel {
    props: ProfileInterface;

    constructor(profileData: ProfileInterface) {
        this.props = profileData;
    }

    getId(): string | undefined {
        return this.props._id;
    }

    get(key: string): any {
        if(this.props.hasOwnProperty(key)) {
            //@ts-ignore
            return this.props[key];
        }
        throw "Error: Profile doesn't have the property: " + key;
    }

    toObject(): ProfileInterface {
        return this.props;
    }

    static keys(): string[] {
        return ["email", "name" ];
    }
}