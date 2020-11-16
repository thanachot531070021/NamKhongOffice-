import { FormGroup } from '@angular/forms';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

export interface IProfileComponent{
    positionItem: any[];
    form: FormGroup
    modalRef: BsModalRef;
    onSubmit(): void;
    onConverImage(inputFile:HTMLInputElement): void;
    openModal(templat:TemplateRef<any>);

}


export interface IProfile{
firstname:string,
lastname:string,
position:string,
image:string;

}