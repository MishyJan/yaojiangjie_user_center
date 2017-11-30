import * as ngCommon from '@angular/common';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirManageComponent } from './dir-manage.component';
import { CreateOrEditDirComponent } from 'app/dir-manage/create-or-edit-dir/create-or-edit-dir.component';
import { CreateOrEditSubdirComponent } from 'app/dir-manage/create-or-edit-subdir/create-or-edit-subdir.component';
import { DirManageRoutes } from 'app/dir-manage/dir-manage.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        DirManageRoutes,
        FormsModule,
        ngCommon.CommonModule,
    ],
    declarations: [
        DirManageComponent,
        CreateOrEditDirComponent,
        CreateOrEditSubdirComponent
    ]
})
export class DirManageModule { }