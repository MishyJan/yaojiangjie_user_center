import { Routes, RouterModule } from '@angular/router';
import { CreateOrEditDirComponent } from 'app/dir-manage/create-or-edit-dir/create-or-edit-dir.component';
import { CreateOrEditSubdirComponent } from 'app/dir-manage/create-or-edit-subdir/create-or-edit-subdir.component';

const routes: Routes = [
    {
        path: 'create-dir',
        component: CreateOrEditDirComponent
    },
    {
        path: 'edit-dir/:id',
        component: CreateOrEditDirComponent
    },
    {
        path: 'create-subdir',
        component: CreateOrEditSubdirComponent
    },
    {
        path: 'edit-subdir/:id',
        component: CreateOrEditSubdirComponent
    },
];

export const DirManageRoutes = RouterModule.forChild(routes);