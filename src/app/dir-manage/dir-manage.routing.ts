import { Routes, RouterModule } from '@angular/router';
import { CreateOrEditDirComponent } from 'app/dir-manage/create-or-edit-dir/create-or-edit-dir.component';
import { CreateOrEditSubdirComponent } from 'app/dir-manage/create-or-edit-subdir/create-or-edit-subdir.component';

const routes: Routes = [
    {
        path: 'create',
        component: CreateOrEditDirComponent
    },
    {
        path: 'create/dir-item/:dirItemIndex',
        component: CreateOrEditSubdirComponent
    },
    {
        path: 'edit/:dirId',
        component: CreateOrEditDirComponent
    },
    {
        path: 'edit/dir-item/:dirId/:dirItemId',
        component: CreateOrEditSubdirComponent
    },
];

export const DirManageRoutes = RouterModule.forChild(routes);